import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardContent,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
  BookmarkButton,
  Line,
} from './Card';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  args: {
    width: '376px',
    height: '306px',
    className: '',
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text', description: '카드의 너비 px' },
    height: { control: 'text', description: '카드의 높이 px' },
    className: { control: 'text', description: '카드의 클래스명' },
  },
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <CardImage src="https://placehold.co/300x200" alt="기본 카드" />
        <CardTitle className="font-memomentKkukkkuk">Card Title</CardTitle>
        <CardSubtitle>Card Subtitle</CardSubtitle>
      </CardContent>
      <Line />
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

export const BookmarkButtonCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <BookmarkButton liked={false} />
        <CardImage src="https://placehold.co/300x200" alt="기본 카드" />
        <CardTitle className="font-memomentKkukkkuk">Card Title</CardTitle>
        <CardSubtitle>Card Subtitle</CardSubtitle>
      </CardContent>
      <Line />
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

export const HrefCard: Story = {
  render: (args) => (
    <Card href="/" {...args}>
      <CardContent>
        <BookmarkButton
          liked={false}
          onChange={(liked) => console.log(liked)}
        />
        <CardImage src="https://placehold.co/300x200" alt="기본 카드" />
        <CardTitle className="font-memomentKkukkkuk">Card Title</CardTitle>
        <CardSubtitle>Card Subtitle</CardSubtitle>
      </CardContent>
      <Line />
      <CardFooter>Footer</CardFooter>
    </Card>
  ),
};

export const CustomCard: Story = {
  render: (args) => (
    <Card {...args}>
      <CardContent>
        <BookmarkButton liked={false} />
        <CardImage src="https://placehold.co/300x200" alt="기본 카드" />
        <CardTitle className="font-memomentKkukkkuk">Card Title</CardTitle>
        <CardSubtitle>Card Subtitle</CardSubtitle>
      </CardContent>
      <Line />
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              fill="currentColor"
            />
          </svg>
          <p>성수역</p>
        </div>
        <div>
          <span className="text-[#af2e07]">3 / 5</span> 모집중
        </div>
      </CardFooter>
    </Card>
  ),
};
