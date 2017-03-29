/*
 * Copyright 2017 Huawei Technologies Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.luxin.dao;

import java.util.List;
import java.util.Map;

import com.luxin.entity.Book;
import com.luxin.mapper.BookMapper;

/**
 * <br>
 * <p>
 * </p>
 * 
 * @author
 * @version NFVO 0.5 Mar 29, 2017
 */
public class BookDao extends AbstractDao implements IBookDao {

    /**
     * <br>
     * 
     * @param id
     * @return
     * @since NFVO 0.5
     */
    public Book getBook(String id) {
        return getMapperManager(BookMapper.class).selectByPrimaryKey(id);
    }

    /**
     * <br>
     * 
     * @param condition
     * @return
     * @since NFVO 0.5
     */
    public List<Book> getBooks(Map<String, Object> condition) {
        return null;
    }

    /**
     * <br>
     * 
     * @param book
     * @return
     * @since NFVO 0.5
     */
    public int addBook(Book book) {
        return getMapperManager(BookMapper.class).insert(book);
    }

    /**
     * <br>
     * 
     * @param id
     * @return
     * @since NFVO 0.5
     */
    public int deleteBookById(String id) {
        return getMapperManager(BookMapper.class).deleteByPrimaryKey(id);
    }

    /**
     * <br>
     * 
     * @param book
     * @return
     * @since NFVO 0.5
     */
    public int updateBook(Book book) {
        return getMapperManager(BookMapper.class).updateByPrimaryKey(book);
    }

}
