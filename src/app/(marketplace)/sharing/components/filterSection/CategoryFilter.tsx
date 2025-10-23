import categories from '@/constants/categories';

export const CategoryFilter = ({
  activeProductType,
  handleProductTypeChange,
}: {
  activeProductType: string;
  handleProductTypeChange: (productType: string) => void;
}) => {
  return (
    <div>
      <h5 className="mb-4 text-lg">카테고리</h5>
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleProductTypeChange(category.value)}
            className={`w-fit shrink-0 cursor-pointer rounded-md px-4 py-2 ${
              activeProductType === category.value
                ? 'border-primary border bg-white'
                : 'hover:border-primary hover:text-primary border border-[#f3f1ef] bg-[#f3f1ef]'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};
