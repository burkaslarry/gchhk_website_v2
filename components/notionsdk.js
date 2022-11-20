const { Client } = require('@notionhq/client');
const {
    CreatePageParameters,
    GetDatabaseResponse,
    GetPagePropertyResponse,
  }  = require("@notionhq/client/build/src/api-endpoints")
  


export const getRecycles = async (mail_data) => {
    return new Promise(async (resolve, reject) => {
        try {
          getDatabaseRecord(process.env.NOTION_RECYCLEKPI_TABLE_KEY, (error, info) => {
                if (error) {
                    console.log(error)
                    resolve(error)
                } else { resolve(info) }
            });

        } catch (error) {
            console.log(error)
        }
    })
}

export const getProjects = async (mail_data) => {
    return new Promise(async (resolve, reject) => {
        try {
          getDatabaseRecord(process.env.NOTION_PROJECT_TABLE_KEY, (error, info) => {
                if (error) {
                    console.log(error)
                    resolve(error)
                } else { resolve(info) }
            });

        } catch (error) {
            console.log(error)
        }
    })
}

export const getEvents = async (mail_data) => {
    return new Promise(async (resolve, reject) => {
        try {
          getDatabaseRecord(config.NOTION_EVENT_TABLE_KEY, (error, info) => {
                if (error) {
                    console.log(error)
                    resolve(error)
                } else { resolve(info) }
            });

        } catch (error) {
            console.log(error)
        }
    })
}

export async function getDatabaseRecord(databaseId) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return {
    props: {
      results: response.results,
    },
  };
}



module.exports = {
    getProjects, getEvents, getRecycles
};
