import userImage from '../../assets/placeholder-image-person-jpg.webp'


export default function CardPostHeader({ photo , name, date }) {
  let src = photo;
  if (!src) {
    src = userImage;
  } else if (typeof src === 'object' && src?.url) {
    src = src.url;
  } else if (typeof src === 'string' && !src.startsWith('http')) {
    // normalize relative paths returned by the API
    src = `https://linked-posts.routemisr.com${src.startsWith('/') ? '' : '/'}${src}`;
  }

  return (
    <>
      <div className="flex">
        <img
          onError={(e) => (e.target.src = userImage)}
          className="rounded-full w-10 h-10 mr-3"
          src={src}
          alt={name}
        />
        <div>
          <h3 className="text-md font-semibold dark:text-white">{name}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {date?.split(".", 1).join().replace("T", " ")}
          </p>
        </div>
      </div>
    </>
  );
}
