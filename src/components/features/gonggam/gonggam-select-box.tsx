import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const gonggamValues = ['일상공유', '꿀팁공유', '여기추천', '밋업'];

interface GonggamSelectBoxProps {
  value: string;
  onChange: (category: string) => void;
}

const GonggamSelectBox = ({ value, onChange }: GonggamSelectBoxProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {gonggamValues.map((value) => (
            <SelectItem key={value} value={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GonggamSelectBox;
