const Card = (props) => {
  const { icon, title, desc, link } = props;
  return (
    <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
      <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
        {icon}
      </span>

      <h2 className="mt-4">{title}</h2>
      <p className="mt-2 text-gray-500 ">{desc}</p>
      <p className="mt-2 text-blue-500">{link}</p>
    </div>
  );
};

export default Card;
