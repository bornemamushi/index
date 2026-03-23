document.addEventListener("DOMContentLoaded", () => {
  const parent = document.querySelector(".append");
  const parent2 = document.querySelector("modals");

  const start = parent.children[0];

  const inputcurtain = parent.children[1];
;
  const txloader = parent.children[2];
  const txcurtain = parent.children[3];
  const tx = parent.children[4];

  const inputmodal = parent2.children[0];

  let currentinputmodal = null;

  [inputcurtain, txloader, txcurtain, tx, inputmodal].forEach((el) => el?.remove());

  document.querySelector(".first-button").addEventListener("click", () => {
    currentinputmodal = inputmodal.cloneNode(true);

    const labelparent = currentinputmodal.querySelector(".input-parent");
    const input = labelparent.children[0];
    const labelclosechild = labelparent.children[1];
    const errorchild = labelparent.children[2];
    const minuschild = labelparent.children[3];
    const createButton = currentinputmodal.querySelector(".second-button");
    const backButton = currentinputmodal.querySelector(".back-button");
    // Initial cleanup
    errorchild.remove();
    labelclosechild.remove();
    minuschild.remove();

    start.animate(
      [
        { transform: "translate3d(0%, 0, 0)" }, // From
        { transform: "translate3d(-100%, 0, 0)" }, // To
      ],
      {
        duration: 500, // 0.267s
        fill: "forwards",
        easing: "cubic-bezier(0.35,0.37,0,1)",
      },
    );
    document.querySelector(".append").appendChild(inputcurtain);
    inputcurtain.animate(
      [
        { transform: "translate3d(100%, 0, 0)" }, // From
        { transform: "translate3d(0%, 0, 0)" }, // To
      ],
      {
        duration: 500, // 0.267s
        fill: "forwards",
        easing: "cubic-bezier(0.35,0.37,0,1)",
      },
    );
    setTimeout(() => {
      document.querySelector(".x1f619").appendChild(currentinputmodal);
      currentinputmodal.querySelector(".x1h0vfkc").animate(
        [
          { opacity: 0 }, // To
          { opacity: 1 }, // From
        ],
        {
          duration: 200, // 0.267s
          // transition-delay: 0s (as per your .modal-overlay-open)
          easing: "cubic-bezier(0.35,0.37,0,1)",
        },
      );

      currentinputmodal.querySelector(".x152xckn").animate(
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
          easing: "cubic-bezier(0.35,0.37,0,1)",
        },
      );

      function isBTC(address) {
        return AddressValidation.validate(address, "mainnet");
      }

      let isClickingButton = false;

      let isDirty = false;

      let canSubmit = false;

      let slashEnabled = true;

      function handleSlashFocus(e) {
        if (!slashEnabled) return;

        if (e.key === "/") {
          e.preventDefault();
          input.focus();
        }
      }

      document.addEventListener("keydown", handleSlashFocus);

      function showClose(animate = true) {
        if (errorchild.isConnected) errorchild.remove();
        if (minuschild.isConnected) minuschild.remove();

        input.style.color = "";
        input.style.pointerEvents = "";

        if (!labelclosechild.isConnected) {
          input.insertAdjacentElement("afterend", labelclosechild);

          if (animate) {
            labelclosechild.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 200,
            });
          }
        }
      }

      function showError() {
        if (labelclosechild.isConnected) labelclosechild.remove();
        if (minuschild.isConnected) minuschild.remove();

        input.style.color = "";
        input.style.pointerEvents = "";

        if (!errorchild.isConnected) {
          input.insertAdjacentElement("afterend", errorchild);
          errorchild.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
          });
        }
      }

      function clearUI() {
        if (errorchild.isConnected) errorchild.remove();
        if (minuschild.isConnected) minuschild.remove();

        if (labelclosechild.isConnected) {
          labelclosechild
            .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 200 })
            .finished.then(() => {
              labelclosechild.remove();
            });
        }

        input.style.color = "";
        input.style.pointerEvents = "";
      }

      function lockValidInput() {
        slashEnabled = false;
        if (errorchild.isConnected) errorchild.remove();
        if (labelclosechild.isConnected) labelclosechild.remove();

        input.style.color = "rgb(60 60 67 / 30%)";
        input.style.pointerEvents = "none";
        input.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
        input.blur();
        if (!minuschild.isConnected) {
          input.insertAdjacentElement("afterend", minuschild);
          minuschild.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 200,
          });
        }
      }

      // ================= INPUT EVENTS =================

      input.addEventListener("focus", () => {
        canSubmit = true; // ✅ allow Enter while typing
        const val = input.value.trim();
        if (val === "") {
          showClose();
        }
      });

      input.addEventListener("input", () => {
        isDirty = input.value.trim() !== "";
        const val = input.value.trim();
        const isValid = isBTC(val);

        if (val === "") {
          canSubmit = false;
          showClose();
        } else if (isValid) {
          canSubmit = true; // ✅ allow Enter after valid
          lockValidInput();
        } else {
          canSubmit = true; // ✅ allow Enter even if invalid (user might paste full address and then fix)
        }
      });

   input.addEventListener("blur", (e) => {
  if (isClickingButton) {
    isClickingButton = false;
    return;
  }

  const next = e.relatedTarget;

  // ✅ skip only for back button (or add more if needed)
  if (next === backButton) {
    return;
  }

  const val = input.value.trim();
  const isValid = isBTC(val);

  if (val === "") {
    clearUI();
    return;
  }

  if (!isValid) {
    canSubmit = false;
    showError();
  } else {
    canSubmit = true;
    lockValidInput();
  }
});
      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && canSubmit) {
          event.preventDefault();
          createButton.click();
        }
      });

   //  window.addEventListener("beforeunload", (event) => {
        if (isDirty) {
          event.preventDefault();
          event.returnValue = "";
        }
     // });

      // ================= BUTTON FIX =================

      createButton.addEventListener("pointerdown", () => {
        isClickingButton = true;
      });

      createButton.addEventListener("click", () => {
        const val = input.value.trim();
        const isValid = isBTC(val);

        if (val === "") {
          showClose(); // 👈 no blink
          input.focus();
          return;
        }

        if (!isValid) {
          showError();
          input.focus();
          return;
        }

        canSubmit = false; // 🔥 stop Enter from working again
        currentinputmodal.querySelector(".x1h0vfkc").animate(
          [
            { opacity: 1 }, // To
            { opacity: 0 }, // From
          ],
          {
            duration: 200, // 0.267s
            // transition-delay: 0s (as per your .modal-overlay-open)
            easing: "cubic-bezier(0.35,0.37,0,1)",
          },
        );
        currentinputmodal
          .querySelector(".x152xckn")
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
              easing: "cubic-bezier(0.35,0.37,0,1)",
            },
          )
          .finished.then(() => {
            currentinputmodal.remove();
            currentinputmodal = null;

            inputcurtain.animate(
              [
                { transform: "translate3d(0%, 0, 0)" }, // From
                { transform: "translate3d(-60%, 0, 0)" }, // To
              ],
              {
                duration: 500, // 0.267s
                fill: "forwards",
                easing: "cubic-bezier(0.35,0.37,0,1)",
              },
            );
            
          
          
         document.querySelector(".append").appendChild(txloader);
    
        txloader.animate(
          [
            { transform: "translate3d(100%, 0, 0)" }, // From
            { transform: "translate3d(0%, 0, 0)" }, // To
          ],
          {
            duration: 500, // 0.267s
            fill: "forwards",
            easing: "cubic-bezier(0.35,0.37,0,1)",
          },
        );

        setTimeout(() => {
          document.querySelector(".append").appendChild(txcurtain);
          txloader.animate(
            [
              { transform: "translate3d(0%, 0, 0)" }, // From
              { transform: "translate3d(-60%, 0, 0)" }, // To
            ],
            {
              duration: 500, // 0.267s
              fill: "forwards",
              easing: "cubic-bezier(0.35,0.37,0,1)",
            },
          );
          txcurtain.animate(
            [
              { transform: "translate3d(100%, 0, 0)" }, // From
              { transform: "translate3d(0%, 0, 0)" }, // To
            ],
            {
              duration: 500, // 0.267s
              fill: "forwards",
              easing: "cubic-bezier(0.35,0.37,0,1)",
            },
          );

          document.querySelector(".x1c4vz4f").appendChild(tx);

          document.querySelector(".first-div").animate(
            [
              { transform: "translate3d(0%, 0, 0)" }, // From
              { transform: "translate3d(-60%, 0, 0)" }, // To
            ],
            {
              duration: 500, // 0.267s
              fill: "forwards",
              easing: "cubic-bezier(0.35,0.37,0,1)",
            },
          );
          tx
            .animate(
              [
                { transform: "translate3d(100%, 0, 0)" }, // From
                { transform: "translate3d(0%, 0, 0)" }, // To
              ],
              {
                duration: 500, // 0.267s
                fill: "forwards",
                easing: "cubic-bezier(0.35,0.37,0,1)",
              },
            )
            
        }, 3000);
          });
      });

      backButton.addEventListener("click", () => {
        if (canSubmit) {
          canSubmit = false;
        }
        if (isDirty) {
          isDirty = false;
        }
        currentinputmodal.querySelector(".x1h0vfkc").animate(
          [
            { opacity: 1 }, // To
            { opacity: 0 }, // From
          ],
          {
            duration: 200, // 0.267s
            // transition-delay: 0s (as per your .modal-overlay-open)
            easing: "cubic-bezier(0.35,0.37,0,1)",
          },
        );
        currentinputmodal
          .querySelector(".x152xckn")
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
              easing: "cubic-bezier(0.35,0.37,0,1)",
            },
          )
          .finished.then(() => {
            currentinputmodal.remove();
            currentinputmodal = null;

            start.animate(
              [
                { transform: "translate3d(-60%, 0, 0)" }, // From
                { transform: "translate3d(0%, 0, 0)" }, // To
              ],
              {
                duration: 500, // 0.267s
                fill: "forwards",
                easing: "cubic-bezier(0.35,0.37,0,1)",
              },
            );

            inputcurtain.animate(
              [
                { transform: "translate3d(0%, 0, 0)" }, // From
                { transform: "translate3d(100%, 0, 0)" }, // To
              ],
              {
                duration: 500, // 0.267s
                fill: "forwards",
                easing: "cubic-bezier(0.35,0.37,0,1)",
              },
            );
          });
      });
      // ================= CLOSE BUTTON =================

      labelclosechild.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();

        input.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });

        input.value = "";
        input.focus();

        showClose();
      });

      // ================= MINUS BUTTON =================

      minuschild.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();

        input.value = "";
        input.style.color = "";
        input.style.pointerEvents = "";
        slashEnabled = true;
        if (minuschild.isConnected) minuschild.remove();
        input.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
        input.focus();
        showClose();
      });

      // ================= ENTER KEY =================

     
    }, 500);
  });
});
