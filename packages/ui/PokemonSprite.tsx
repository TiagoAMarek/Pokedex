import Image from "next/image";

type ImageProps = {
  imageSrc?: string;
  name?: string;
};

export const PokemonSprite = ({ imageSrc, name }: ImageProps) => {
  return (
    <div className="shrink-0">
      <Image
        src={imageSrc ?? ""}
        alt={`imagem of a ${name}`}
        className="h-12 w-12"
        width={100}
        height={100}
      />
    </div>
  );
};
