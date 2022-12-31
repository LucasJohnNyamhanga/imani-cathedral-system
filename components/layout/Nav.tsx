import React, { useContext, useEffect, useState } from "react";
import Styles from "../../styles/navigation.module.scss";
import Link from "next/link";
import { NavContext } from "../../components/context/StateContext";
import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import User from "../layout/User";
import Image from "next/image";
import Toggle from "../tools/Toggle";

const Nav = () => {
  const { setNavActive, navActive } = useContext(NavContext);
  const { data: session, status } = useSession();
  const [limt, setLimit] = useState(0);
  const [hover, setHover] = useState("");
  const { push, asPath } = useRouter();

  let handleSignIn = () => {
    push({
      pathname: "/Auth/SignIn",
      query: { callbackUrl: asPath.trim() },
    });
  };

  let handleSomaBiblia = () => {
    push({
      pathname: "/SomaBiblia",
    });
  };

  let handleLogOut = () => {
    signOut({ redirect: false }).then(() => {
      setLimit(0);
      push("/");
    });
  };

  let handleHover = (neno: string) => {
    setHover(neno);
  };

  const vikundiList = [
    { name: "Kwaya ya Uinjilist", link: "/#" },
    { name: "Kwaya ya Imani", link: "/#" },
    { name: "Kwaya ya Tumaini", link: "/#" },
    { name: "Kwaya ya Vijana", link: "/#" },
    { name: "Umoja wa vijana", link: "/#" },
    { name: "Umoja wa wakinamama", link: "/#" },
  ];

  const hudumaList = [
    { name: "Ratiba za Ibada", link: "/#" },
    { name: "Ibada za Kusifu na Kuabudu", link: "/#" },

    { name: "Semina", link: "/#" },
    { name: "Fellowship", link: "/#" },
    { name: "Darasa la Ubatizo", link: "/#" },
    { name: "Darasa la Kipaimara", link: "/#" },
    { name: "Darasa la Ndoa", link: "/#" },
  ];

  const sisi = [
    { name: "Historia ya Kanisa", link: "/#" },
    { name: "Uongozi", link: "/#" },
    { name: "Jumuiya", link: "/#" },
    { name: "Baraza la Wazee", link: "/#" },
  ];

  const habariList = [
    { name: "Matangazo", link: "/#" },
    { name: "Habari Na Matukio", link: "/#" },
    { name: "Mahubiri Na Mafundisho", link: "/#" },
  ];

  useEffect(() => {}, [navActive]);

  return (
    <div className={Styles.container}>
      <div className={Styles.innerContainerTop}>
        <div className={Styles.NavDetails}>
          <div className={Styles.topAdvatisment}>
            <p>Mawasiliano : 0700 000 000 | huduma@kkktimani.org</p>
          </div>
        </div>
        <div className={Styles.NavHeaderDetails}>
          <div className={Styles.utangulizi}>
            <div className={Styles.logo}>
              <div className={Styles.icon}>
                <Image
                  alt=""
                  src={"/imani.png"}
                  objectFit={"contain"}
                  placeholder="blur"
                  blurDataURL={"/imani.png"}
                  width={100}
                  height={100}
                />
              </div>
              <div className={Styles.kkkt}>KKKT USHARIKA WA IMANI</div>
              <div className={Styles.verse}>
                <div className={Styles.details}>
                  &ldquo;Akasema, Uso wangu utakwenda pamoja nawe, nami nitakupa
                  raha.&rdquo;
                </div>
                <div className={Styles.number}>Kutoka 33:14</div>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.NavHeader}>
          <nav className={Styles.nav}>
            <div className={Styles.links}>
              <ul>
                <Link href="/">
                  <a>
                    <div
                      onClick={() => {
                        setNavActive("Mwanzo");
                      }}
                    >
                      <li
                        className={
                          "Mwanzo" == navActive ? Styles.active : Styles.links
                        }
                      >
                        Mwanzo
                      </li>
                    </div>
                  </a>
                </Link>
                <div>
                  <li>
                    Kuhusu Sisi
                    <ul>
                      {sisi.map((value, index) => (
                        <Link href={value.link} key={value.name}>
                          <li>{value.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </div>
                <div>
                  <li>
                    Huduma
                    <ul>
                      {hudumaList.map((value, index) => (
                        <Link href={value.link} key={value.name}>
                          <li>{value.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </div>
                <div>
                  <li>
                    Vikundi
                    <ul>
                      {vikundiList.map((value) => (
                        <Link href={value.link} key={value.name}>
                          <li>{value.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </div>
                <Link href="/Miradi">
                  <a>
                    <div
                      onClick={() => {
                        setNavActive("Miradi");
                      }}
                    >
                      <li
                        className={
                          "Miradi" == navActive ? Styles.active : Styles.links
                        }
                      >
                        Miradi
                      </li>
                    </div>
                  </a>
                </Link>
                <div>
                  <li>
                    Habari
                    <ul>
                      {habariList.map((value, index) => (
                        <Link href={value.link} key={value.name}>
                          <li>{value.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </li>
                </div>
                <Link href="/SomaBiblia">
                  <a>
                    <div
                      onClick={() => {
                        setNavActive("Biblia");
                      }}
                    >
                      <li
                        className={
                          "Biblia" == navActive ? Styles.active : Styles.links
                        }
                      >
                        Soma Biblia
                      </li>
                    </div>
                  </a>
                </Link>
              </ul>
            </div>
            <div className={Styles.buttonsNav}>
              {status == "loading" ? (
                <div className={Styles.validating}>Uhakiki...</div>
              ) : session ? (
                <>
                  <User signOut={handleLogOut} />
                </>
              ) : (
                <>
                  <div onClick={handleSignIn} className={Styles.Register}>
                    Ingia
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Nav;
