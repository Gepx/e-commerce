import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import productService from '@/components/features/products/services/productService';
import { useMutation } from '@tanstack/react-query';
import productClientSchema from '@/schemas/productClientSchema';

const useProductForm = ({ initialData = null, setDialogOpen }) => {
  const [activeVariants, setActiveVariants] = useState({});
  const [variantOptions, setVariantOptions] = useState({});
  const [variantStock, setVariantStock] = useState({});
  const [variantPrice, setVariantPrice] = useState({});
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const form = useForm({
    resolver: zodResolver(productClientSchema),
    defaultValues: initialData || {
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

  useEffect(() => {
    form.setValue('productImages', imagePreviews, { shouldValidate: true });
  }, [imagePreviews, form]);

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);

      setSelectedCategories(initialData.productCategory || []);
      setImagePreviews(
        initialData.productImages?.map((img) => ({ file: null, preview: img })) || []
      );

      if (initialData.variants && initialData.variations) {
        const newActiveVariants = {};
        const newVariantOptions = {};
        initialData.variants.forEach((variant) => {
          newActiveVariants[variant.type] = true;
          newVariantOptions[variant.type] = variant.options;
        });
        setActiveVariants(newActiveVariants);
        setVariantOptions(newVariantOptions);

        const newVariantStock = {};
        const newVariantPrice = {};
        initialData.variations.forEach((variation) => {
          const combinationKey = Object.keys(variation.attributes)
            .sort()
            .map((key) => variation.attributes[key])
            .join('|');

          newVariantStock[combinationKey] = variation.stock;
          newVariantPrice[combinationKey] = variation.price;
        });

        setVariantStock({ combinations: newVariantStock });
        setVariantPrice({ combinations: newVariantPrice });
      }
    }
  }, [initialData, form]);

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

  const { mutate: updateProduct, isPending: updating } = useMutation({
    mutationFn: (payload) => productService.updateProduct(payload.id, payload.data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      setDialogOpen(false);
    },
    onError: (err) => {
      toast.error(err?.message || 'Failed to update product.');
    }
  });

  const isPending = creating || updating;

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
    // form.setValue('productImages', newImageFiles, { shouldValidate: true });

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
    const imageToRemove = imagePreviews[index];

    if (imageToRemove.preview && !imageToRemove.file) {
      setRemovedImages((prev) => [...prev, imageToRemove.preview]);
    }
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    // form.setValue('productImages', newImageFiles, { shouldValidate: true });
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
        if (key === 'productImages') return;

        const value = data[key];

        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (typeof value === 'object' && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const existingImageUrls = initialData
        ? imagePreviews
            .filter(
              (img) =>
                !img.file && typeof img.preview === 'string' && /^https?:\/\//.test(img.preview)
            )
            .map((img) => img.preview)
        : [];

      if (existingImageUrls.length > 0) {
        formData.set('existingImages', JSON.stringify(existingImageUrls));
      }

      if (removedImages.length > 0) {
        formData.append('removedImages', JSON.stringify(removedImages));
      }

      imageFiles.forEach((file) => {
        formData.append('productImages', file);
      });

      const variants = Object.keys(activeVariants)
        .filter((type) => activeVariants[type] && variantOptions[type]?.length > 0)
        .map((type) => ({
          type,
          options: variantOptions[type].filter((option) => option.trim() !== '')
        }));
      formData.set('variants', JSON.stringify(variants));

      const variations = generateVariantCombinations.map((combination) => {
        const key = Object.values(combination).join('|');
        return {
          attributes: combination,
          stock: Number(variantStock.combinations?.[key]) || 0,
          price: Number(variantPrice.combinations?.[key]) || 0
        };
      });
      formData.set('variations', JSON.stringify(variations));

      if (initialData) {
        updateProduct({ id: initialData._id, data: formData });
      } else {
        createProduct(formData);
      }
    },
    [
      removedImages,
      imageFiles,
      imagePreviews,
      activeVariants,
      variantOptions,
      generateVariantCombinations,
      variantStock,
      variantPrice,
      initialData,
      createProduct,
      updateProduct
    ]
  );

  const onInvalid = useCallback((errors) => {
    console.error('Form Validation Failed:', errors);

    let firstErrorMessage = 'Please complete all required fields.';
    for (const key in errors) {
      if (errors[key]?.message) {
        firstErrorMessage = errors[key].message;
        break;
      }

      if (typeof errors[key] === 'object') {
        for (const nestedKey in errors[key]) {
          if (errors[key][nestedKey]?.message) {
            firstErrorMessage = errors[key][nestedKey].message;
            break;
          }
        }
      }
    }
    // const messages = Object.values(errors)
    //   .map((err) => err?.message)
    //   .filter(Boolean);
    // if (messages.length > 0) {
    //   toast.error(messages[0]);
    // } else {
    //   toast.error('Please complete all required fields.');
    toast.error(firstErrorMessage);
    // }
  }, []);

  return {
    form,
    isPending,
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
