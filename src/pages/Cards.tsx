function Cards() {
  const data = [
    { id: 1, title: "Card One", desc: "This is card number one." },
    { id: 2, title: "Card Two", desc: "This is card number two." },
    { id: 3, title: "Card Three", desc: "This is card number three." },
    { id: 4, title: "Card Four", desc: "This is card number four." },
    { id: 5, title: "Card Five", desc: "This is card number five." },
    { id: 6, title: "Card Six", desc: "This is card number six." },
    { id: 7, title: "Card Seven", desc: "This is card number seven." },
    { id: 8, title: "Card Eight", desc: "This is card number eight." },
  ];

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-6 justify-center">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full sm:w-[45%] lg:w-[23%] bg-white shadow-md rounded-xl p-5 border"
          >
            <h2 className="text-xl font-bold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
