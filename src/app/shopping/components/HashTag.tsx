export const HashTag = ({ tags }: { tags: string[] }) => {
  const handleTagClick = (tag: string) => {
    console.log(tag);
  };

  return (
    <>
      {tags.map((tag) => (
        <span
          className="text-primary cursor-pointer text-sm font-medium hover:underline"
          onClick={() => handleTagClick(tag)}
          key={tag}
        >
          {`# ${tag}`}
        </span>
      ))}
    </>
  );
};
