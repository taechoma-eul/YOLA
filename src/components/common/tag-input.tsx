'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  maxTags?: number;
}

const TagInput = ({ value = [], onChange, maxTags = 6 }: TagInputProps) => {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState('');
  const [inputVisible, setInputVisible] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  const triggerShake = () => {
    setShouldShake(true);
    setTimeout(() => setShouldShake(false), 300); // 애니메이션 끝난 뒤 해제
  };

  const MAX_TAG_LENGTH = 8;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTags(value);
  }, [value]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const addTag = (tag: string): boolean => {
    const cleaned = tag.trim().replace(/^#/, '');
    if (!cleaned || tags.includes(cleaned) || tags.length >= maxTags || cleaned.length > MAX_TAG_LENGTH) {
      triggerShake();
      return false;
    }

    const newTags = [...tags, cleaned];
    setTags(newTags);
    onChange?.(newTags);
    return true;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing === false) {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const success = addTag(inputValue);
        if (success) setInputValue('');
      }
    }
  };

  const handleRemove = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_TAG_LENGTH) {
      setInputValue(value);
    } else {
      triggerShake();
    }
  };
  const shakeAnimation = {
    initial: { x: 0 },
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.3 }
    }
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
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
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

      <motion.div
        key={shouldShake ? 'shake' : 'stable'} // key 변경으로 애니메이션 재실행 유도
        {...(shouldShake ? shakeAnimation : {})}
        className="mt-2 flex w-full items-center gap-1 text-xs text-gray-500"
      >
        <Info className="h-[13px] w-[13px]" />
        최대 8글자, 6개 이내
      </motion.div>
    </div>
  );
};

export default TagInput;
