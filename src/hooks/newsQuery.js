import {useStaticQuery, graphql} from 'gatsby';

export const newsStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query NewsStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/news/"}}}) {
            edges {
              node {
                fields {
                   slug
                }
                frontmatter {
                   date(formatString: "DD MMMM YYYY")
                   description
                   featured
                   title
                }
                html
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).map(n => n);
};
