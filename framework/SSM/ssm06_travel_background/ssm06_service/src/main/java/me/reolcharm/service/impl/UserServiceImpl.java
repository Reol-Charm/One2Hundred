/**
 * @Project: SSM02_Perpare4Module
 * @Author: Reolcharm
 * @CreatedTime: 2018-11-08 20:33
 * @Description:
 **/
package me.reolcharm.service.impl;

import me.reolcharm.domain.UserInfo;
import me.reolcharm.mapper.UserMapper;
import me.reolcharm.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserMapper userMapper;

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may possibly be case sensitive, or case insensitive depending on how the
     * implementation instance is configured. In this case, the <code>UserDetails</code>
     * object that comes back may have a username that is of a different case than what
     * was actually requested..
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     *                                   GrantedAuthority
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        /*查询 db 中的 UserInfo 信息*/
        UserInfo myUsesrWaiting4Login = userMapper.findByUsername(username);
        /*将查到的结果 封装到spring security 的 UserDetails 中*/
        UserDetails userDetail = new User(myUsesrWaiting4Login.getUsername(),
                myUsesrWaiting4Login.getPassword(),
                null);

        return userDetail;
    }
}
