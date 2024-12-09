import React, { useState } from 'react';

const RadioGroup: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('建築');

  const categories = [
    '建築',
    '土木',
    '電気',
    'プラント',
    '設備',
    '内装',
    '建築・作図',
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h2>業種選択</h2>
      {categories.map((category) => (
        <div key={category}>
          <label>
            <input
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={handleChange}
            />
            {category}
          </label>
        </div>
      ))}
      <p>選択中の業種: {selectedCategory}</p>
    </div>
  );
};

export default RadioGroup;
