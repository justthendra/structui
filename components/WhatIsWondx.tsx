"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatIsWondx() {
  return (
    <section className="bg-white dark:bg-[#09090b] py-16 md:py-28 px-6 md:px-8 overflow-hidden transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-[1100px] mx-auto items-center">
        {/* Left Column Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-[481px] flex flex-col justify-start items-start gap-8"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            {/* What is structui Badge */}
            <div className="inline-flex items-center gap-1.5 mb-1">
              <span className="text-zinc-500 dark:text-zinc-400 text-xs font-semibold font-geist leading-none">
                What is
              </span>
              <img
                src="/icons/structui-logo.svg"
                alt="structui"
                className="h-5 w-auto dark:brightness-110"
              />
            </div>

            <h2 className="self-stretch max-w-[432px] text-[#202020] dark:text-white text-[40px] md:text-[56px] font-extrabold font-bricolage tracking-[-2px] md:tracking-[-2.8px] leading-[1.07]">
              Where great code is built &amp; shared.
            </h2>

            <p className="self-stretch max-w-[432px] text-zinc-500 dark:text-zinc-400 text-base font-normal font-geist leading-relaxed">
              Think GitHub meets Dribbble, but built entirely around code snippet
              sharing &amp; component monetization. Browse, copy, download or
              publish your own work to an audience that values clean architecture.
            </p>
          </div>

          {/* Numbered Value Propositions */}
          <div className="w-full max-w-[400px] flex flex-col justify-start items-start gap-6">
            {/* 01 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex justify-start items-start gap-4"
            >
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold font-geist mt-0.5">
                01
              </span>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <h3 className="text-[#202020] dark:text-zinc-100 text-base font-semibold font-geist">
                  Discover by stack
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-[13px] font-normal font-geist leading-relaxed">
                  Curated feeds, trending repositories and developer-tagged
                  frameworks so you always find the exact component that fits.
                </p>
              </div>
            </motion.div>

            {/* 02 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex justify-start items-start gap-4"
            >
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold font-geist mt-0.5">
                02
              </span>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <h3 className="text-[#202020] dark:text-zinc-100 text-base font-semibold font-geist">
                  Developers earn &amp; keep everything
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-[13px] font-normal font-geist leading-relaxed">
                  Sell UI kits, backend scripts or boilerplates and keep 100% of what you
                  earn. Zero platform commission, ever. no hidden fees.
                </p>
              </div>
            </motion.div>

            {/* 03 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex justify-start items-start gap-4"
            >
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] font-bold font-geist mt-0.5">
                03
              </span>
              <div className="flex-1 flex flex-col justify-start items-start gap-1">
                <h3 className="text-[#202020] dark:text-zinc-100 text-base font-semibold font-geist">
                  Verified &amp; production-ready
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs md:text-[13px] font-normal font-geist leading-relaxed">
                  Every snippet is linted, type-checked, and security reviewed.
                  What you copy is safe, tested, responsive, and ready for production.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center w-full"
        >
          <div className="rounded-2xl overflow-hidden shadow-xl border border-neutral-200/80 dark:border-zinc-800 hover:scale-[1.01] transition-transform duration-500 bg-white dark:bg-zinc-900">
            <img
              src="/images/discode-inspiration.jpg"
              alt="structui code snippet components collection showcase"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
