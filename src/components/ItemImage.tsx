interface Props {
  img: string | null;
}

export default function ItemImage(props: Props) {
  const { img } = props;

  return img && <img src={img} className="max-h-80" />;
}
