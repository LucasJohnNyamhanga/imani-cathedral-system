import { Drawer, Box, List, ListItemText, Divider } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Styles from "../../styles/drawer.module.scss";

type dataType = {
  textHeader: string;
  active: string;
  userData: {
    id: string;
    isAdmin: boolean;
    userName: string;
    image: string;
    isSuperUser: boolean;
  };
  handleClick: (value: string) => void;
};

export const MuiDrawer = ({
  textHeader,
  active,
  handleClick,
  userData,
}: dataType) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {}, [active]);

  return (
    <>
      <div
        onClick={() => {
          setIsDrawerOpen(true);
        }}
        className={Styles.setCenter}
      >
        {textHeader}
      </div>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} width="250px" textAlign="center" role="presentation">
          <ListItemText primary={textHeader} />
          <div className={Styles.headerDash}>Washarika</div>
          <List>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("maombiYaliokamilika");
              }}
            >
              <Link passHref href={``}>
                <a>
                  <div
                    className={
                      active == "maombiYaliokamilika"
                        ? `${Styles.active} ${Styles.normal}`
                        : `${Styles.normal}`
                    }
                  >
                    {"Maombi Yaliyokamilika"}
                  </div>
                </a>
              </Link>
            </div>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("maombiKasoro");
              }}
            >
              <Link passHref href={``}>
                <a>
                  <div
                    className={
                      active == "maombiKasoro"
                        ? `${Styles.active} ${Styles.normal}`
                        : `${Styles.normal}`
                    }
                  >
                    {"Mombi yenye Kasoro"}
                  </div>
                </a>
              </Link>
            </div>
            <Divider />
          </List>
          <div className={Styles.headerDash}>Matoleo</div>
          <List>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("sadakaAhadi");
              }}
            >
              <Link passHref href={``}>
                <a>
                  <div
                    className={
                      active == "sadakaAhadi"
                        ? `${Styles.active} ${Styles.normal}`
                        : `${Styles.normal}`
                    }
                  >
                    {"Sadaka ya Ahadi"}
                  </div>
                </a>
              </Link>
            </div>
            <Divider />
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default MuiDrawer;
