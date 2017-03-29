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

import com.luxin.entity.Booktype;
import com.luxin.mapper.BooktypeMapper;

/**
 * <br>
 * <p>
 * </p>
 * 
 * @author
 * @version NFVO 0.5 Mar 29, 2017
 */
public class BooktypeDao extends AbstractDao implements IBooktypeDao {

    /**
     * <br>
     * 
     * @param id
     * @return
     * @since NFVO 0.5
     */
    public Booktype getBooktype(String id) {
        return getMapperManager(BooktypeMapper.class).selectByPrimaryKey(id);
    }

    /**
     * <br>
     * 
     * @param condition
     * @return
     * @since NFVO 0.5
     */
    public List<Booktype> getBooktypes(Map<String, Object> condition) {
        return null;
    }

    /**
     * <br>
     * 
     * @param booktype
     * @return
     * @since NFVO 0.5
     */
    public int addBooktype(Booktype booktype) {
        return getMapperManager(BooktypeMapper.class).insert(booktype);
    }

    /**
     * <br>
     * 
     * @param id
     * @return
     * @since NFVO 0.5
     */
    public int deleteBooktypeById(String id) {
        return getMapperManager(BooktypeMapper.class).deleteByPrimaryKey(id);
    }

    /**
     * <br>
     * 
     * @param booktype
     * @return
     * @since NFVO 0.5
     */
    public int updateBooktype(Booktype booktype) {
        return getMapperManager(BooktypeMapper.class).updateByPrimaryKey(booktype);
    }

}
