// import { Skeleton, SkeletonButton } from "./Skeleton"
import Link from 'next/link';

type PostCardProps = {
  id: number;
  title: string;
  body: string;
};

export function PostCard({ id, title, body }: PostCardProps) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" href={`/posts/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}

// export function SkeletonPostCard() {
//   return (
//     <div className="card">
//       <div className="card-header">
//         <Skeleton short />
//       </div>
//       <div className="card-body">
//         <div className="card-preview-text">
//           <Skeleton />
//           <Skeleton />
//           <Skeleton />
//           <Skeleton />
//         </div>
//       </div>
//       <div className="card-footer">
//         <SkeletonButton />
//       </div>
//     </div>
//   )
// }
