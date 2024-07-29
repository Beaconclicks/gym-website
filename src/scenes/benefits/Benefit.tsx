import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "@/shared/types";

const childVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

type Props = {
  icon: JSX.Element;
  title: string;
  description: string;
  setSelectedPage: (value: SelectedPage) => void;
};

const Benefit = ({ icon, title, description, setSelectedPage }: Props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  return (
    <motion.div
      variants={childVariant}
      className="mt-5 rounded-md border-2 border-gray-100 px-5 py-16 text-center"
    >
      <div className="mb-4 flex justify-center">
        <div className="rounded-full border-2 border-gray-100 bg-primary-100 p-4">
          {icon}
        </div>
      </div>

      <h4 className="font-bold">{title}</h4>
      <p className="my-3">{description}</p>
      <AnchorLink
        className="text-sm font-bold text-primary-500 underline hover:text-secondary-500"
        onClick={() => setSelectedPage(SelectedPage.ContactUs)}
        href={`#${SelectedPage.ContactUs}`}
      >
        <p>Learn More</p>
      </AnchorLink>

      {data && (
        <div className="mt-4">
          <p>Bitcoin Price: {data.bpi.USD.rate}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Benefit;
