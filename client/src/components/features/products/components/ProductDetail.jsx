import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProductDetail = ({ productSpecification, productDescription, specValue }) => {
  return (
    <div>
      <Card className="shadow-lg h-fit">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900">Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <table className="w-full">
                <tbody>
                  {Object.entries(productSpecification).map(([key, value]) => (
                    <tr className="border-b border-gray-200" key={key}>
                      <td className="py-2 font-medium text-gray-700 w-1/3 capitalize">{key}</td>
                      <td className="py-2 text-gray-600">{specValue(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed">{productDescription}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;
