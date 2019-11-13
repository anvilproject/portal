/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic news and events [scoops] service.
 */

/**
 * Returns Date instance of a date string.
 *
 * @param date
 * @returns {Date}
 */
function getDate(date) {

    return new Date(date);
}

/**
 * Returns the scoops' introduction.
 *
 * @param posts
 */
export function getIntroduction(posts) {

    if ( !posts ) {

        return;
    }

    const scoops = posts.filter(post => {

        const slug = getSlug(post);

        return isIntroduction(slug);
    });

    return scoops[0];
}

/**
 * Returns the list of scoops, excluding the introduction.
 *
 * @param posts
 */
export function getScoops(posts) {

    if ( !posts ) {

        return;
    }

    const scoops = posts.filter(post => {

        const slug = getSlug(post);

        return !isIntroduction(slug);
    });

    return orderScoopsByDate(scoops);
}

/**
 * Returns true if any scoops are featured.
 *
 * @param scoops
 * @returns {*}
 */
export function isAnyScoopsFeatured(scoops) {

    if ( !scoops ) {

        return false;
    }

    return scoops.some(scoop => scoop.frontmatter.featured === true)
}

/**
 * Returns date as empty string when date format is invalid.
 *
 * @param date
 * @returns {*}
 */
export function validateDate(date) {

    if ( date === "Invalid date" ) {

        return "";
    }

    return date;
}

/**
 * Returns slug for the post, when specified.
 *
 * @param post
 * @returns {string}
 */
function getSlug(post) {

    if ( !post ) {

        return "";
    }

    return post.fields.slug;
}

/**
 * Returns true if the scoop is the introduction.
 *
 * @param slug
 * @returns {boolean}
 */
function isIntroduction(slug) {

    if ( !slug ) {

        return false;
    }

    return slug.includes("intro");
}

/**
 * Order scoops by date.
 *
 * @param scoops
 */
function orderScoopsByDate(scoops) {

    if ( !scoops ) {

        return scoops;
    }

    return scoops.sort((scoop1, scoop2) => {

        const date1 = getDate(scoop1.frontmatter.date);
        const date2 = getDate(scoop2.frontmatter.date);

        if (date1 < date2) {

            return 1;
        }

        if (date1 > date2) {

            return -1;
        }

        return 0;
    });
}