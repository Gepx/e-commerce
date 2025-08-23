import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import productService from '@/services/productService';
import { productSchema } from '@/schemas/productSchema';
import { useMutation } from '@tanstack/react-query';

const useProductForm = (setDialogOpen) => {
  const [activeVariants, setActiveVariants] = useState({});
  const [variantOptions, setVariantOptions] = useState({});
  const [variantStock, setVariantStock] = useState({});
  const [variantPrice, setVariantPrice] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: '',
      productImages: [],
      productSpecification: {
        brand: '',
        weight: {
          value: 0,
          unit: 'g'
        },
        material: '',
        origin: '',
        warranty: ''
      },
      productDescription: '',
      productCategory: [],
      productPrice: 0,
      stock: 0,
      variants: [],
      reviews: []
    }
  });

  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: creating } = useMutation({
    mutationFn: (formData) => productService.createProduct(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully.');

      form.reset();
      setActiveVariants({});
      setVariantOptions({});
      setVariantStock({});
      setVariantPrice({});
      setImageFiles([]);
      setImagePreviews([]);
      setSelectedCategories([]);
      setDialogOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to create product.');
    }
  });

  const typeVariants = [
    {
      type: 'color',
      label: 'Color'
    },
    {
      type: 'size',
      label: 'Size'
    }
  ];

  const addVariantOption = (type) => {
    setActiveVariants((prev) => ({ ...prev, [type]: !prev[type] }));
    if (!variantOptions[type]) {
      setVariantOptions((prev) => ({ ...prev, [type]: [''] }));
    }
  };

  const addNewVariantOption = (type) => {
    setVariantOptions((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), '']
    }));
  };

  const updateVariantOption = (type, index, value) => {
    setVariantOptions((prev) => {
      const newOptions = [...(prev[type] || [])];
      newOptions[index] = value;
      return { ...prev, [type]: newOptions };
    });
  };

  const deleteVariantOption = (type, index) => {
    setVariantOptions((prev) => {
      const newOptions = prev[type].filter((_, i) => i !== index);
      return { ...prev, [type]: newOptions };
    });
  };

  const generateVariantCombinations = useMemo(() => {
    const activeTypes = Object.keys(activeVariants).filter(
      (type) => activeVariants[type] && variantOptions[type]?.length > 0
    );
    if (activeTypes.length === 0) return [];
    if (activeTypes.length === 1) {
      const type = activeTypes[0];
      return variantOptions[type]
        .filter((option) => option.trim() !== '')
        .map((option) => ({ [type]: option }));
    }
    const combinations = [];
    const types = activeTypes;
    const options = types.map((type) =>
      variantOptions[type].filter((option) => option.trim() !== '')
    );

    const generateCombinations = (current, index) => {
      if (index === types.length) {
        combinations.push({ ...current });
        return;
      }

      options[index].forEach((option) => {
        generateCombinations({ ...current, [types[index]]: option }, index + 1);
      });
    };

    generateCombinations({}, 0);
    return combinations;
  }, [activeVariants, variantOptions]);

  const handleCombinationStockChange = (combination, value) => {
    const combinationKey = Object.values(combination).join('|');
    setVariantStock((prev) => ({
      ...prev,
      combinations: {
        ...prev.combinations,
        [combinationKey]: Number(value)
      }
    }));
  };

  const handleCombinationPriceChange = (combination, value) => {
    const combinationKey = Object.values(combination).join('|');
    setVariantPrice((prev) => ({
      ...prev,
      combinations: {
        ...prev.combinations,
        [combinationKey]: Number(value)
      }
    }));
  };

  const categoryOptions = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books',
    'Gaming',
    'Sports & Outdoors',
    'Beauty & Personal Care',
    'Automotive',
    'Toys & Games',
    'Other'
  ];

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const maxFiles = 10;
    const totalFiles = imageFiles.length + files.length;

    if (totalFiles > maxFiles) {
      toast.error(`You can only upload up to ${maxFiles} images.`);
      return;
    }

    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);
    form.setValue('productImages', newImageFiles, { shouldValidate: true });

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target.result;
          setImagePreviews((prevPreviews) => [...prevPreviews, { file, preview: previewUrl }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    form.setValue('productImages', newImageFiles);
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(newCategories);
    form.setValue('productCategory', newCategories);
  };

  const hasActiveVariants = Object.values(activeVariants).some((isActive) => isActive);

  const onSubmit = useCallback(
    (data) => {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key !== 'productImages' && key !== 'variants' && key !== 'variations') {
          const value = data[key];

          if (typeof value === 'object' && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value || ''));
          }
        }
      });

      imageFiles.forEach((file) => {
        formData.append('productImages', file);
      });

      const variants = Object.keys(activeVariants)
        .filter((type) => activeVariants[type] && variantOptions[type]?.length > 0)
        .map((type) => ({
          type,
          options: variantOptions[type].filter((option) => option.trim() !== '')
        }));
      formData.append('variants', JSON.stringify(variants));

      const variations = generateVariantCombinations.map((combination) => {
        const key = Object.values(combination).join('|');
        return {
          attributes: combination,
          stock: Number(variantStock.combinations?.[key]) || 0,
          price: Number(variantPrice.combinations?.[key]) || 0
        };
      });
      formData.append('variations', JSON.stringify(variations));

      createProduct(formData);
    },
    [
      imageFiles,
      activeVariants,
      variantOptions,
      generateVariantCombinations,
      variantStock,
      variantPrice,
      createProduct
    ]
  );

  const onInvalid = useCallback((errors) => {
    console.log('Form validation errors:', errors);
    const messages = Object.values(errors)
      .map((err) => err?.message)
      .filter(Boolean);
    if (messages.length > 0) {
      toast.error(messages[0]);
    } else {
      toast.error('Please complete all required fields.');
    }
  }, []);

  return {
    form,
    creating,
    onSubmit,
    onInvalid,
    addVariantOption,
    addNewVariantOption,
    updateVariantOption,
    deleteVariantOption,
    generateVariantCombinations,
    handleCombinationStockChange,
    handleCombinationPriceChange,
    handleImageUpload,
    removeImage,
    handleCategoryChange,
    hasActiveVariants,
    imageFiles,
    imagePreviews,
    selectedCategories,
    typeVariants,
    categoryOptions,
    variantOptions,
    variantStock,
    variantPrice,
    activeVariants,
    setDialogOpen
  };
};

export default useProductForm;
