package com.luxin.entity;

import java.io.Serializable;

/**
 * 
 *
 * @author l00345485
 * @date 2017-3-29
 *
 */
public class Book implements Serializable {
    /**  */
    private String id;

    /**  */
    private String bookName;

    /**  */
    private String author;

    /**  */
    private String typeId;

    /**  */
    private Float price;

    /**  */
    private String brief;

    private static final long serialVersionUID = 1L;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }
}