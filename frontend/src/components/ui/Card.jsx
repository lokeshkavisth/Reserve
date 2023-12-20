const Card = (props) => {
  return (
    <div className="p-4 rounded-lg bg-blue-50 md:p-6 ">
      <span className="inline-block p-3 text-blue-500 rounded-lg bg-blue-100/80 ">
        {props.icon}
      </span>

      <h2 className="mt-4">{props.title}</h2>
      <p className="mt-2 text-sm text-gray-500 ">{props.desc}</p>
      <p className="mt-2 text-sm text-blue-500">{props.link}</p>
    </div>
  );
};

export default Card;
