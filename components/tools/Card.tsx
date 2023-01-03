import Image from "next/image";
import Styles from "../../styles/card.module.scss";

const Card = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.left}>
        <div className={Styles.image}>
          <Image
            alt=""
            src={"/mchungaji.png"}
            placeholder="blur"
            blurDataURL={"/mchungaji.png"}
            height={235}
            width={235}
          />
        </div>
      </div>
      <div className={Styles.right}>
        <div className={Styles.description}>
          <h1>MCH. BONIFACE SALAWA MADUHU</h1>
          <h2>Mchungaji wa Usharika</h2>
          <p>
            &#8220;Ninakusalimu katika Jina la Bwana wetu Yesu Kristo.
            Nakukaribisha mdau wetu, msharika na usiye msharika, mtu binafsi,
            kikundi au rafiki yetu popote ulipo, kuendelea kutembelea tovuti hii
            mara kwa mara ili upate fursa ya kujifunza Neno la Mungu na kupata
            huduma mbalimbali zinazotolewa na Usharika.&#8221;
          </p>
          {/* <p className={Styles.readmore}>
						<a href='#'>Read More</a>
					</p> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
