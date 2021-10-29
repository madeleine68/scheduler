import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";


const formatSpots = function(spots) {
    if (spots === 0) {
        return `no spots remaining`;
    }
    else if (spots === 1) {
        return `${spots} spot remaining`;
    } else {
    return `${spots} spots remaining`;
    }
}


export default function DayListItem(props) {
    // const message=formatSpots(props.spots)

    const dayClass = classNames("day-list__item",
        {
        "day-list__item--selected" : props.selected,
        "day-list__item--full": props.spots === 0
        })
        
    
    return (
        <li className={dayClass} onClick={() => props.setDay(props.name)}>
            <h2 className="text--regular">{props.name}</h2>
            <h3 className="text--light">{props.spots} spots remaining</h3>
        </li>
        );
    }
  