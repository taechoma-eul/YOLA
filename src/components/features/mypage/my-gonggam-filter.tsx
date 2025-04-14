import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectBoxProps {
  value: string;
  onChange: (sort: string) => void;
}

export function SelectBox({ value, onChange }: SelectBoxProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="latest">최신순</SelectItem>
          <SelectItem value="comments">댓글 많은 순</SelectItem>
          <SelectItem value="likes">공감 많은 순</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
