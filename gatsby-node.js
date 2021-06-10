const path = require('path');
exports.createPages = async ({graphql, actions}) => {
    const {data} = await graphql(`
        query Posts {
            allMarkdownRemark{
                nodes{
                    frontmatter {
                        url
                        category
                    }
                }
            }
        }
    `)

    console.log("data>>", data);
    data.allMarkdownRemark.nodes.forEach( node => {
        const { url, category} = node.frontmatter;
            actions.createPages = ({
                path: `./${category}/${url}`,
                component: path.resolve('./src/Templates/Posts.js'),
                context: {url}
            })
        })
}