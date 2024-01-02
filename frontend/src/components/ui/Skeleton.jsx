const SkeletonRow = ({ height = "3", width = "w-full", colSpan = 1 }) => {
  const conditionalClasses = `h-${height} bg-blue-200 rounded ${width} col-span-${colSpan}`;

  return <div className={conditionalClasses} />;
};

const Skeleton = ({ rowProps }) => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          {rowProps.map((props, index) => (
            <SkeletonRow key={index} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
