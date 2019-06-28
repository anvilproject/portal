/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL card component.
 */

// Core dependencies
import React from "react";

// Styles
import compStyles from "./card.module.css";

const classNames = require("classnames");

class Card extends React.Component {

    /* Card Class Name */
    getCardClassName = () => {

        const {docPath, post} = this.props,
            {frontmatter} = post,
            {linkTo} = frontmatter;

        return classNames({
            [compStyles.card]: true,
            [compStyles.link]: linkTo,
            [compStyles.team]: docPath.startsWith("/team"),
            [compStyles.about]: docPath.startsWith("/about")
        });
    };

    render() {
        const {post} = this.props,
            {frontmatter, html} = post,
            {linkTo} = frontmatter;
        let id = (html.split('id="')[1].split('">')[0]);
        const CardType = ({linkTo, children, ...props}) => {
            return linkTo ? React.createElement('a', {
                href: linkTo,
                target: "_blank",
                rel: "noopener noreferrer", ...props
            }, children) : React.createElement("div", props, children);
        };
        return (
            <CardType id={id} linkTo={linkTo} className={this.getCardClassName()}
                      dangerouslySetInnerHTML={{__html: html}}/>
        );
    }
}

export default Card;