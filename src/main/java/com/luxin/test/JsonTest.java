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

package com.luxin.test;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * <br>
 * <p>
 * </p>
 * 
 * @author
 * @version NFVO 0.5 Mar 25, 2017
 */
public class JsonTest {

    /**
     * <br>
     *
     * @param args
     * @since NFVO 0.5
     */
    public static void main(String[] args) {
        JSONObject jsonObj = new JSONObject();
        JSONArray jsonArr = new JSONArray();
        String data =
                "[{\"memory_mb\": 128543,\"name\": \"compute-4\",\"disk_gb\": 91130,\"project\": \"(total)\",\"cpu\": 32}, {\"memory_mb\": 51712,\"name\": \"compute-4\",\"disk_gb\": 310,\"project\": \"(used_now)\",\"cpu\": 7}, {\"memory_mb\": 51200,\"name\": \"compute-4\",\"disk_gb\": 310,\"project\": \"(used_max)\",\"cpu\": 7}, {\"memory_mb\": 51200,\"name\": \"compute-4\",\"disk_gb\": 310,\"project\": \"27639d9ca1cb4d959e243b152f905d8e\",\"cpu\": 7}]";
        jsonArr = JSONArray.fromObject(data);
        for(Object obj : jsonArr) {
            JSONObject.fromObject(obj).put("vimId", "vimId");
            JSONObject.fromObject(obj).put("vimName", "vimName");
        }
        System.out.println(jsonArr);

        for(int i = 0; i < jsonArr.size(); i++) {
            JSONObject o = jsonArr.getJSONObject(i);
            o.put("vimId", "vimId");
            o.put("vimName", "vimName");
        }
        System.out.println(jsonArr);
    }

}
