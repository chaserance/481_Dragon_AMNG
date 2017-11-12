package com.dragon.server.controller;

import com.dragon.server.common.ErrorCode;
import com.dragon.server.common.ErrorResponse;
import com.dragon.server.common.WebUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class ProxyController {

    @RequestMapping("/404")
    public String NOT_FOUND(HttpServletRequest request) {
        if(WebUtil.isAjax(request)) {
            return "forward:/ajax404";
        }
        return "forward:/";
    }

    @RequestMapping("/401")
    public String UNAUTHORIZED(HttpServletRequest request) {
        if(WebUtil.isAjax(request)) {
            return "forward:/api/401";
        }
        return "redirect:/";
    }

    @RequestMapping("/ajax404")
    @ResponseBody
    public ResponseEntity Ajax_NOT_FOUND(HttpServletRequest request) {
        final ErrorResponse apiError = ErrorResponse.of("Resource NOT FOUND", ErrorCode.RESOURCE_NOT_FOUND, HttpStatus.NOT_FOUND);
        return new ResponseEntity(apiError, HttpStatus.NOT_FOUND);
    }
}
