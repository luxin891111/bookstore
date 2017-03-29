package com.luxin.entity;

import java.io.Serializable;

/**
 * 
 *
 * @author l00345485
 * @date 2017-3-29
 *
 */
public class Booktype implements Serializable {
    /**  */
    private String id;

    /**  */
    private String title;

    /**  */
    private String detail;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }
}