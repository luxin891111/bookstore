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

package com.luxin.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.luxin.dao.BookDao;
import com.luxin.entity.Book;

/**
 * <br>
 * <p>
 * </p>
 * 
 * @author
 * @version NFVO 0.5 Mar 29, 2017
 */
public class BookService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BookService.class);

    private BookDao bookDao;

    public Book getBook(String id) {
        return bookDao.getBook(id);
    }

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
}
