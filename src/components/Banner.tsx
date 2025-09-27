interface BannerProps {
  title: string;
}

const Banner = ({ title }: BannerProps) => (
 <h1 className="text-3xl font-bold text-center py-6 text-gray-800">
    {title}
  </h1>
);

export default Banner;