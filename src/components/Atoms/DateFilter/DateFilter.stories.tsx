import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DateFilter } from './DateFilter';

const meta = {
  title: 'Atoms/DateFilter',
  component: DateFilter,
  parameters: {
    layout: 'centered',
  },
  args: {
    className: '',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DateFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `
const [dateFilter, setDateFilter] = useState<"desc" | "asc">("desc");

	return (
		<DateFilter
			value={dateFilter}
			onChange={(value) => setDateFilter(value)}
		/>
	)`,
      },
    },
  },
};
