/*
 * Copyright 2016 Huawei Technologies Co., Ltd.
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

/**
 * <br>
 * <p>
 * </p>
 * 
 * @author
 * @version NFVO 0.5 Oct 28, 2016
 */
public interface IBookDao {

    Book getBook(String id);

    List<Book> getBooks(Map<String, Object> condition);

    int addBook(Book book);

    int deleteBookById(String id);

    int updateBook(Book book);
}
