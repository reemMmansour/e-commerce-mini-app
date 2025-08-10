import { useTranslations } from "next-intl";

export default function MenuCategory() {
  const t = useTranslations();

  const menuItems = [
    t("main.menuItems1"),
    t("main.menuItems2"),
    t("main.menuItems3"),
    t("main.menuItems4"),
    t("main.menuItems5"),
  ];
  return (
    <>
      <div className="main-menu">
        {menuItems.map((item, index) => (
          <span
            className="list"
            key={index}>
            {item}
          </span>
        ))}
      </div>
    </>
  );
}
