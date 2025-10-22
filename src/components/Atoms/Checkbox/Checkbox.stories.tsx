import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Checkbox } from './Checkbox';
import { Label } from '@/components/Atoms';
import { useState } from 'react';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    required: false,
    disabled: false,
    className: '',
    id: 'checkbox',
    name: 'checkbox',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Checkbox
            {...args}
            id="checkbox"
            name="checkbox"
            className="cursor-pointer"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <Label htmlFor="checkbox" className="cursor-pointer">
            체크박스입니다.
          </Label>
        </div>
        <div className="text-sm text-gray-600">
          <p>상태: {checked ? '✅ 체크됨' : '❌ 체크 안됨'}</p>
        </div>
      </div>
    );
  },
};

export const CheckboxWithForm: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('체크 상태:', checked);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Checkbox
              {...args}
              id="checkbox1"
              name="checkbox1"
              checked={checked}
              onChange={(checked) => setChecked(checked)}
              className="cursor-pointer"
            />
            <Label htmlFor="checkbox1" className="cursor-pointer">
              체크박스입니다.
            </Label>
          </div>

          <button type="submit">Submit</button>
        </div>
      </form>
    );
  },
};
