import { useState, useRef, useEffect } from "react";
import Styles from "../../styles/imageUpload.module.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Image from "next/image";

type dataType = {
  uploadToServer: (image: string | Blob, action: boolean) => void;
  imageReady: Blob | string;
};

export default function PrivatePage({ uploadToServer, imageReady }: dataType) {
  const [display, setDisplay] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState<
    string | null | undefined
  >(null);
  const fileSelector = useRef<HTMLInputElement>(null!);

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

  const uploadToClient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setCreateObjectURL(URL.createObjectURL(i));
      setDisplay(true);
      uploadToServer(i, true);
    }
  };

  useEffect(() => {
    if (typeof imageReady != "string") {
      setCreateObjectURL(URL.createObjectURL(imageReady));
      setDisplay(true);
    }
  }, [imageReady]);

  return (
    <div className={Styles.container}>
      <div>
        {display && (
          <Image
            alt=""
            src={createObjectURL!}
            objectFit={"cover"}
            placeholder="blur"
            blurDataURL={createObjectURL!}
            width={215}
            height={250}
            objectPosition={"center"}
          />
        )}
        <input
          ref={fileSelector}
          type="file"
          hidden
          name="myImage"
          onChange={(e) => {
            uploadToClient(e);
          }}
          accept="image/*"
        />
        <div
          onClick={() => fileSelector.current.click()}
          className={Styles.imageSelect}
        >
          <AddPhotoAlternateIcon />
          <div className={Styles.imageSelectText}>Pakia Picha Yako</div>
        </div>
      </div>
    </div>
  );
}
