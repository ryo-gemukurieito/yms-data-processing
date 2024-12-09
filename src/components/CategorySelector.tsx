import React from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['建築', '土木', '電気', 'プラント', '設備', '内装', '建築・作図'];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategoryChange,
}) => (
  <div>
    <h2>カテゴリを選択してください</h2>
    {categories.map((category) => (
      <label key={category} style={{ marginRight: '10px' }}>
        <input
          type="radio"
          name="category"
          value={category}
          checked={selectedCategory === category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />
        {category}
      </label>
    ))}
    <p>現在選択されているカテゴリ: {selectedCategory}</p>
  </div>
);

export default CategorySelector;
