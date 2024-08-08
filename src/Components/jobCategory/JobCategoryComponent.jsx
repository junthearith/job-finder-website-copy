// Components/jobCategory/JobCategoryComponent.jsx
import { Dropdown } from 'flowbite-react';
import { useState } from 'react';

export default function JobCategoryComponent({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="">
      <Dropdown label={selectedCategory ? selectedCategory.category_name : "Job category"} inline dismissOnClick={false}>
        {categories.map((category) => (
          <Dropdown.Item key={category.id} onClick={() => handleSelect(category)}>
            {category.category_name}
          </Dropdown.Item>
        ))}
      </Dropdown>
      {selectedCategory && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{selectedCategory.category_name}</h2>
          <ul>
            {selectedCategory.skills.length > 0 ? (
              selectedCategory.skills.map((skill, index) => <li key={index}>{skill}</li>)
            ) : (
              <li>No skills available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
