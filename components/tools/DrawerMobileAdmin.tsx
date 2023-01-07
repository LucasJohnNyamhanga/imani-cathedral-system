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
          <div className={Styles.headerDash}>Uboreshaji</div>
          <List>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("machapisho");
              }}
            >
              <Link passHref href={``}>
                <div
                  className={
                    active == "machapisho"
                      ? `${Styles.active} ${Styles.normal}`
                      : `${Styles.normal}`
                  }
                >
                  {"Machapisho"}
                </div>
              </Link>
            </div>
            <Divider />
          </List>
          <div className={Styles.headerDash}>Matangazo</div>
          <List>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("matangazo");
              }}
            >
              <Link passHref href={``}>
                <a>
                  <div
                    className={
                      active == "matangazo"
                        ? `${Styles.active} ${Styles.normal}`
                        : `${Styles.normal}`
                    }
                  >
                    {"Matangazo"}
                  </div>
                </a>
              </Link>
            </div>
            <Divider />
          </List>
          <div className={Styles.headerDash}>Usimamizi</div>
          <List>
            <Divider />
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                handleClick("watumiaji");
              }}
            >
              <Link passHref href={``}>
                <a>
                  <div
                    className={
                      active == "watumiaji"
                        ? `${Styles.active} ${Styles.normal}`
                        : `${Styles.normal}`
                    }
                  >
                    {"Watumiaji"}
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
