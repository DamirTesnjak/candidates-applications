'useClient'

import {useEffect, useState} from "react";
import styles from "./selectInput.module.scss";

export default function SelectInput({
    label,
    value,
    handleChange,
    listDropdown,
}) {
    const replaceOldSelectElement = () => {
        let i, j, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        const x = document.getElementsByClassName(`${styles.customSelect}`)

        const l = x.length;
        for (i = 0; i < l; i++) {
            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", `${styles.selectSelected}`);
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", `${styles.selectItems} ${styles.selectHide}`);
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function() {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    let y, i, k, yl;
                    const s = this.parentNode.parentNode.getElementsByTagName("select")[0]
                    const sl = s.length;
                    const h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName(`${styles.sameAsSelected}`);
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", `${styles.sameAsSelected}`);
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function(e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle(`${styles.selectHide}`);
                this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            let i
            const x = document.getElementsByClassName(`${styles.selectItems}`);
            const y = document.getElementsByClassName(`${styles.selectSelected}`);
            const xl = x.length;
            const yl = y.length;
            const arrNo = [];
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add(`${styles.selectHide}`);
                }
            }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
    }

    useEffect(() => {
        replaceOldSelectElement();

        return () => {
            const customSelect = document.getElementsByClassName(`${styles.customSelect}`)[0]
            if(customSelect) {
                customSelect.parentNode.removeChild(document.getElementsByClassName(`${styles.selectSelected}`)[0]);
            }
        }
    }, [])

    return (
        <div>
            <div className={styles.customSelect}>
                <label>{label}</label>
                <select>
                    {listDropdown.map((listDropdownItem) => (
                        <option
                            key={listDropdownItem.id}
                            value={listDropdownItem.value}
                        >
                            {listDropdownItem.value}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}