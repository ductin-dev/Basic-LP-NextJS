"use client"

import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useEffect } from "react";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIÁ BANK HIỆN TẠI",
  description: 'Giá bank java hiện tại nè',
  metadataBase: new URL('https://hahaha.mrtin.dev'),
  openGraph: {
    title: "GIÁ BANK HIỆN TẠI",
    description:
      "Giá bank java hiện tại nè",
    images: [
      {
        url: "/bg.png",
      },
    ],
    url: "https://hahaha.mrtin.dev",
  },
};

export default function Home() {
  const BASE_TIMESTAMP = 1749631457021;
  const BASE_PRICE = 300000;

  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const updatePrice = () => {
      const now = Date.now();
      const elapsed = Math.floor((now - BASE_TIMESTAMP) / 80);
      setPrice(BASE_PRICE + elapsed);
    };

    updatePrice();
    const interval = setInterval(updatePrice, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>GIÁ BANK HIỆN TẠI</title>
        <meta name="description" content="Giá bank java hiện tại nè" />
        <meta property="og:image" content="/bg.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <span style={{ fontWeight: 600, fontSize: 25 }}>⚠️ ÔI KHÔNG, GIÁ HIỆN TẠI ĐÃ LÀ</span>
            <span style={{ fontWeight: 800, color: "darkorange", fontSize: 45, marginTop: 5 }}>
              <span style={{ fontWeight: 200, color: "white", fontSize: 15, marginRight: 5 }}>VND</span>{price !== null ? price.toLocaleString("en-US") : "Đang tải..."}
            </span>
          </div>
          <Image
            className={styles.logo}
            src="/Hoz_Dark.png"
            alt="logo của tao"
            width={180}
            height={60}
            priority
          />
          <ol>
            <li>
              Hãy mua nhanh! before nó tăng:{" "}
              <code style={{ color: "darkorange" }}>BANK VIP JAVA SE 11</code>
            </li>
            <li>Cam đoan 100% không hoàn tiền</li>
          </ol>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://drive.google.com/file/d/1Cb3MHJgdJL9QqHRrqwpX6JhxGpuwiSsa/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className={styles.logo}
                src="/vercel.svg"
                alt="Vercel logomark"
                width={20}
                height={20}
              />
              Mua ngay
            </a>
            <a
              href="https://drive.google.com/file/d/1_-MhBvGv4m8xei6escYIK-7lpf92-5rc/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Không mua, xem demo đã
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
