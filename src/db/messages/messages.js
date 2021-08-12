const MESSAGE_LIMIT = 30;

class Messages {
  constructor() {
  }

  async messagesByChatId(chatId) {
    // get the last x messages for a given chat
    return await shared.db.pg.massive.query(`
      SELECT *
      FROM
        (
          SELECT
            messages.id as id,
            chat_id,
            content,
            sender_id,
            actors.display_name as sender_display_name,
            messages.created_at as created_at
          FROM 
            messages
            JOIN actors ON messages.sender_id = actors.id
          WHERE chat_id = $1
          ORDER BY messages.created_at
          DESC
          LIMIT $2
        ) as latest_messages
      ORDER BY latest_messages.created_at
      ASC;
    `,[chatId, MESSAGE_LIMIT])
  }

  async moreMessagesToLoad(chatId) {
    // returns [{count: <int>}]
    const totalMessages =  await shared.db.pg.massive.query(`
      SELECT
        COUNT (*)
      FROM messages
      WHERE chat_id = $1;
    `, [chatId]);

    return totalMessages[0].count >= MESSAGE_LIMIT;
  }

  async getWholeChat(chatId) {
    // get the whole chat log
    return await shared.db.pg.massive.query(`
      SELECT *
      FROM
        (
          SELECT
            messages.id as id,
            chat_id,
            content,
            sender_id,
            actors.display_name as sender_display_name,
            messages.created_at as created_at
          FROM 
            messages
            JOIN actors ON messages.sender_id = actors.id
          WHERE chat_id = $1
          ORDER BY messages.created_at
          DESC
        ) as latest_messages
      ORDER BY latest_messages.created_at
      ASC;
  `,[chatId])
  }

  async getNextPageMessages(chatId, lastChatMessageId) {
    const messages = await shared.db.pg.massive.query(`
      SELECT *
      FROM 
        (
        SELECT
            messages.id,
            chat_id,
            content,
            sender_id,
            actors.display_name as sender_display_name,
            messages.created_at as created_at
          FROM 
            messages
            JOIN actors ON messages.sender_id = actors.id
        WHERE messages.chat_id = $1 AND messages.id < $2
        ORDER BY messages.ID 
        DESC 
        LIMIT $3
      ) as prev_messages
      ORDER BY prev_messages.created_at
      ASC;
    `, [chatId, lastChatMessageId, MESSAGE_LIMIT])

    // id the query returns no messages, or if it returns less then the MESSAGE_LIMIT
    // there are no messages left to get, so set hasMoreToLoad to false
    return {
      hasMoreToLoad: !(messages.length < MESSAGE_LIMIT || messages.length === 0),
      messageList: messages
    }
  }

  async deleteChatMessage(chatId, messageId) {
    // stub for deleting a message from the chat
  }

  async editChatMessage(chatId, messageId, newMessage) {
    // stub for editing a message in a given chat
  }
}

module.exports = new Messages()
