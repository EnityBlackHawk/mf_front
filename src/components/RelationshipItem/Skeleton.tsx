import Image from "next/image";

export default function RelationshipItemSkeleton() {
  return (
    <div className="flex flex-row items-center gap-10 w-full h-fit p-5 border-2 border-gray-300 rounded-2xl animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-24"></div>
      <div className="h-6 bg-gray-300 rounded w-6"></div>
      <div className="h-6 bg-gray-300 rounded w-24"></div>
      <div className="flex flex-col">
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="flex flex-col">
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="flex flex-col">
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
      <div className="flex flex-col">
        <div className="h-4 bg-gray-300 rounded w-20 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
}
