const Footer = () => {
  return (
    <footer className="flex justify-between items-center h-[120px]">
      <div>left</div>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div>Copyrite&copy;2024</div>
        <div className="text-[10px] tracking-wide">Все права защищены</div>
      </div>
      <div>right</div>
    </footer>
  );
};

export default Footer;
