const Skeleton = () => {
  return (
    <div className="border rounded-md p-4 w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className="h-6 bg-blue-200 rounded w-28"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-3 bg-blue-200 rounded col-span-2"></div>
              <div className="h-2 bg-blue-200 rounded col-span-2"></div>
              <div className="h-2 bg-blue-200 rounded col-span-1"></div>
              <div className="h-2 bg-blue-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-blue-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
