'use client';

import { useEffect, useState } from 'react';

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  maxTags?: number;
}

const TagInput = ({ value = [], onChange, maxTags = 5 }: TagInputProps) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    setTags(value);
  }, [value]);

  const addTag = (tag: string) => {
    const cleaned = tag.trim().replace(/^#/, '');
    if (!cleaned || tags.includes(cleaned) || tags.length >= maxTags) return;

    const newTags = [...tags, cleaned];
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
      setInputValue('');
    }
  };

  const handleRemove = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 rounded-md border border-gray-300 px-3 py-2">
      {!inputVisible && (
        <button
          type="button"
          onClick={() => setInputVisible(true)}
          className="rounded border border-gray-300 px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
        >
          +태그추가
        </button>
      )}

      {inputVisible && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="입력 후 Enter 또는 ,"
          className="min-w-[80px] rounded border border-gray-300 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-yellow-200"
        />
      )}

      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 rounded border border-gray-400 px-3 py-1 text-sm text-gray-700"
        >
          <span>#{tag}</span>
          <button type="button" onClick={() => handleRemove(tag)} className="text-gray-500 hover:text-red-500">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default TagInput;
